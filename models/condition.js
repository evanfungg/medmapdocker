import mongoose, { Schema } from "mongoose";

// subclass of condition
const medicationSchema = new Schema(
    {
        name: String,
        is_effective: [Boolean],
    });

const conditionSchema = new Schema(
    {
        name: String,
        medications: [medicationSchema],
    },
    {
        timestamps: true,
    }
);

const Condition = mongoose.models.condition || mongoose.model("condition", conditionSchema);

export default Condition;