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

export const classSchema = new Schema({
    levels: [
        {
            type: SchemaTypes.ObjectId,
            ref: "Level"
        }
    ],
    students: [
        studentSchema
    ]
});