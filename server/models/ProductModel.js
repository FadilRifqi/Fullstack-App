import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Products = db.define('product',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    image:{
        type:DataTypes.STRING,
    },
    url:{
        type:DataTypes.STRING,
    }
},{
    freezeTableName:true
})

Users.hasMany(Products);
Products.belongsTo(Users,{foreignKey:'user_id',onDelete: 'CASCADE' })

export default Products;