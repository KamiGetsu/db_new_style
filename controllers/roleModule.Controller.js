import { connect } from '../config/database.js';


export const showRoleModule = async (req, res) => {
    try {
        let sqlQuery= "SELECT * FROM role_module";
        const [result] = await connect.query(sqlQuery);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error fetching role_module", details: error.message });
    }
};

export const showRoleModuleId = async (req, res) => {
    try {
        const [result] = await connect.query('SELECT * FROM role_module WHERE Role_module_id', [req.params.id]);
        if (result.length === 0) return res.status(404).json({ error: "Role module not found"});
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Error fetching role_module", details: error.message });
    }
};

export const addRoleModule = async (req, res) => {
    try {
        const { Permissions, RoleFk, ModuleFk } = req.body;
        if ( !Permissions || !RoleFk ||!ModuleFk )  {
            return res.status(400).json({ error: "Missing required fields" });
        }
        let sqlQuery = "INSERT INTO role_module (Permissions, Role_fk, Module_fk) VALUES (?,?,?)";
        const [result] = await connect.query(sqlQuery, [ Permissions, RoleFk, ModuleFk]);
        res.status(201).json({
            data: [{ id: result.insertId, Permissions, RoleFk, ModuleFk }],
            status: 201
        });
    } catch (error) {
        res.status(500).json({ error: "Error adding role_module ", details: error.message });
    }
};

export const updateRoleModule = async (req, res) => {
    try {
        const {Permissions, RoleFk, ModuleFk} = req.body;
        if (!Permissions || !RoleFk || !ModuleFk) {
            return res.status(400).json({ error: "Missing required fields "});
        }
        let sqlQuery = "UPDATE role_module SET Permissions=?, Role_fk=?, Module_fk=?  WHERE Role_module_id=?";
        const [result] = await connect.query(sqlQuery, [Permissions, RoleFk, ModuleFk, req.params.id ]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "role_module not found"});
        res.status(200).json({
            data: [{Permissions, RoleFk, ModuleFk}],
            status: 200,
            updated: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({ error: "Error updating role_module", details: error.message });
    }
};

export const deleteRoleModule = async (req, res) => {
    try {
        let sqlQuery = "DELETE FROM role_module WHERE Role_module_id =?";
        const [result] = await connect.query(sqlQuery, [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "role_module not found" });
        res.status(200).json({
            data: [],
            status: 200,
            deleted: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({ error: "Error deleting role_module", details: error.message});
    }
};
