const offerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    percent: { type: Number, required: true, min: 0, max: 100 },
    exp_date: { type: Date, required: true },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

offerSchema.index({ store: 1, status: 1 });

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
