import { Schema, SchemaTypes } from "mongoose";
import { fileService } from "../../services/file";
import { IStudentDocument } from "../student";

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
    picture: {
        type: SchemaTypes.String,
    },
}, {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc: IStudentDocument, ret: any) => {
                if (doc.picture) {
                    ret.pictureUrl = fileService.createExternalUrl(doc.picture);
                } else {
                    ret.pictureUrl = null;
                }
                return ret;
            },
        },
    });

const groupSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
});

export const classSchema = new Schema({
    start: { type: SchemaTypes.Date, required: true },
    end: { type: SchemaTypes.Date, required: true },
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
