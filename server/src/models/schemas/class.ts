import { Schema, SchemaType, SchemaTypes } from "mongoose";

const studentSchema = new Schema({
    firstname: {
        type: SchemaTypes.String,
        required: true,
    },
    lastname: {
        type: SchemaTypes.String,
        required: true,
    },
    sex: {
        type: SchemaTypes.String,
        enum: ['MALE', 'FEMALE', 'UNKNOW'],
        default: 'UNKNOW'
    },
    level: {
        type: SchemaTypes.ObjectId,
        ref: "Level"
    }
});

const groupSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    level: {
        type: SchemaTypes.ObjectId,
        ref: "Level"
    }
});

export const classSchema = new Schema({
    levels: [
        {
            type: SchemaTypes.ObjectId,
            ref: "Level"
        }
    ],
    groups: [
        groupSchema,
    ],
    students: [
        studentSchema
    ]
});