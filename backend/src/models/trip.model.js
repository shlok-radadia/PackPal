import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const tripSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tripName: {
            type: String,
            required: true,
            trim: true
        },
        destination: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        purpose: {
            type: String,
            required: true,
            trim: true
        },
        packingItems: [
            {
                item: { type: String, required:true },
                packed: { type: Boolean, default: false }
            }
        ],
        weatherData: {
            type: Object,
            required: true,
            default: {}
        }
    },
    {
        timestamps: true
    }
)

tripSchema.plugin(mongooseAggregatePaginate);

export const Trip = mongoose.model("Trip", tripSchema);