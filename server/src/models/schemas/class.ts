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
    shortname: {
        type: SchemaTypes.String,
    },
    sex: {
        type: SchemaTypes.String,
        enum: ["MALE", "FEMALE", "UNKNOW"],
        default: "UNKNOW",
    },
    grade: {
        type: SchemaTypes.ObjectId,
        ref: "Grade",
    },
    birthday: {
        type: SchemaTypes.Date,
    },
    notes: {
        type: SchemaTypes.String,
    },
    pictureUrl: {
        type: SchemaTypes.String,
    },
}, { timestamps: true, toJSON: { virtuals: true } });

const groupSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
});

export const classSchema = new Schema({
    grades: [
        {
            type: SchemaTypes.ObjectId,
            ref: "Grade",
        },
    ],
    groups: [
        groupSchema,
    ],
    students: [
        studentSchema,
    ],
}, { timestamps: true, toJSON: { virtuals: true } });
