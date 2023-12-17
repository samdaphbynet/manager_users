const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const dotenv = require('dotenv')

dotenv.config();

const multer = require("multer")
const path = require("path")

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.static("public"))


const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

app.use('/', (err, res) => {
    return res.json("success")
})

app.post("/signup", async (request, response) => {
    const sql = "INSERT INTO employer(`name`, `email`, `password`) VALUES (?)"
    const  values = [
        await request.body.name,
        await request.body.email,
        await request.body.password
    ]
    db.query(sql,  [values], (err, result) => {
        if (err) {
            console.error("Error executing SQL query", err)
            return response.json({Status: false, Error: "Error creating user",err})
        } 
        return  response.json({Status: true, Result:result})
    })
});

app.post("/login", (request, response) => {
    const sql = "SELECT * FROM employer WHERE `email` = ? AND `password` = ?";
    db.query(sql, [request.body.email, request.body.password], (err, data) => {
        if (err) {
            return response.json("Error")
        }
        if (data.length > 0) {
            return response.json("Success")
        }else {
            return response.json("Failed")
        }
    })
});

app.post('/add_category', (request, response) => {
    const sql = "INSERT INTO category(`name`) VALUES (?)";
    db.query(sql, [request.body.category], (err, data) => {
        if (err) {
            return response.json({Status: false, Error: "Error to insert category"})
        }
        return response.json({Status: true})
        
    })
});

app.get('/category', (request, response) => {
    const sql = "SELECT * FROM category";

    db.query(sql, (err, data) => {
        if (err) {
            return response.json({Status: false, Error: "Error to insert category"})
        }
        return response.json({Status: true, Data: data})
    })
});

app.get("/employ", (req, res) => {
    const sql = "SELECT * FROM listemployer";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({Status: false, Error: "Error to insert listemployer"})
        }
        return res.json({Status: true, Data:data})
    })
})

// handle Image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9 );
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});
const upload = multer({ storage: storage });

app.post("/add_employer", upload.single('image'), (req, res) => {
    const imagePath = req.file ? req.file.filename : null;
    const sql = `INSERT INTO listemployer
                (name, email, password, salary, address, image, category_id)
                VALUES (?)`;
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.salary,
        req.body.address,
        imagePath,
        req.body.category_id,
    ]

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json({Status: false, Error: err})
        }
        return res.json({Status: true})
    })
});

app.get("/employ/:id", (request, response) => {
    const id = request.params.id
    const sql = "SELECT * FROM listemployer WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return response.json("Error", err)
        }else {
            return response.json(data)
        }
    })
});

app.put("/edit_employer/:id", (request, response) => {
    const id = request.params.id;
    const values = [
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.salary,
        request.body.address,
        request.body.category_id
    ]
    const sql = "UPDATE listemployer SET name = ?, email = ?, password = ?, salary = ?, address = ?, category_id = ? WHERE id = ?";
    db.query(sql, [...values,id], (err, data) => {
        if (err) {
            return response.json({Status:false, Error: "Error updating list"})
        }else {
            return response.json({Status: true, Data: data});
        }
    })
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM listemployer WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({Status: false, Error: "Error deleting employee"})
        }else {
            return res.json({Status: true, Data: data})
        }
    })
});

app.get("/admin", (req, res) => {
    const sql = "SELECT count(id) as admin from employer"
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({Status: false, Error:"Error to count asmin"+err});
        }
        else {
            return res.json({Status: true, Result:result});
        }
    })
});

app.get("/listadmin", (req, res) => {
    const sql = "SELECT * from employer"
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({Status: false, Error:"Error to count asmin"+err});
        }
        else {
            return res.json({Status: true, Result:result});
        }
    })
})

app.get("/countemployer", (req, res) => {
    const sql = "SELECT COUNT(id) as employer FROM listemployer"
    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error")
        }else {
            return res.json(data)
        }
    })
});

app.get("/salarytotal", (req, res) => {
    const sql = "SELECT sum(salary) as salarytest from listemployer";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({Status: false, Error: "Error to sum salary"})
        }else {
            return res.json({Status: true, Data: data})
        }
    })
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})