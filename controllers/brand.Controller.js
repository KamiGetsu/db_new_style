import { connect } from '../config/database.js';


export const showBrand = async (req, res) => {
    try {
        let sqlQuery= "SELECT * FROM brand";
        const [result] = await connect.query(sqlQuery);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Brand", details: error.message });
    }
};

export const showBrandId = async (req, res) => {
    try {
        const [result] = await connect.query('SELECT * FROM brand WHERE Brand_id=? ', [req.params.id]);
        if (result.length === 0) return res.status(404).json({ error: "Brand not found"});
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Brand", details: error.message });
    }
};

export const addBrand = async (req, res) => {
    try {
        const { BrandName } = req.body;
        if (!BrandName)  {
            return res.status(400).json({ error: "Missing required fields" });
        }
        let sqlQuery = "INSERT INTO brand (Brand_name) VALUES (?)";
        const [result] = await connect.query(sqlQuery, [ BrandName ]);
        res.status(201).json({
            data: [{ id: result.insertId, BrandName }],
            status: 201
        });
    } catch (error) {
        res.status(500).json({ error: "Error adding Brand ", details: error.message });
    }
};

export const updateBrand = async (req, res) => {
    try {
        const { BrandName } = req.body;
        if ( !BrandName ) {
            return res.status(400).json({ error: "Missing required fields "});
        }
        let sqlQuery = "UPDATE brand SET Brand_name=?  WHERE Brand_id=?";
        const [result] = await connect.query(sqlQuery, [BrandName, req.params.id ]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Brand not found"});
        res.status(200).json({
            data: [{ BrandName }],
            status: 200,
            updated: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({ error: "Error updating Brand", details: error.message });
    }
};

export const deleteBrand = async (req, res) => {
    try {
        let sqlQuery = "DELETE FROM brand WHERE Brand_id = ?";
        const [result] = await connect.query(sqlQuery, [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Brand not found" });
        res.status(200).json({
            data: [],
            status: 200,
            deleted: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({ error: "Error deleting Brand", details: error.message});
    }
};
