import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const listingSchema = new mongoose.Schema(
    {
        donor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
            default: null
        },
        itemName: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

listingSchema.plugin(mongooseAggregatePaginate);

export const Listing = mongoose.model("Listing", userSchema);