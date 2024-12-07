const storeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

storeSchema.index({ owner: 1 });

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
