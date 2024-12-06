import React, { useState } from "react";
import {
  FaReply,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { BiMessageRoundedError } from "react-icons/bi";
import Modal from "react-modal";

// Modal Configuration
Modal.setAppElement("#root");
const modalStyles = {
  content: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    border: "none",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
};

const Reviews = () => {
  const [queries, setQueries] = useState([
    {
      id: 1,
      user: "John Doe",
      message: "I need help with my recent order.",
      date: "2024-12-01",
      status: "Pending",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Can I get a discount on bulk orders?",
      date: "2024-11-30",
      status: "Resolved",
    },
  ]);

  const [feedback, setFeedback] = useState([
    { user: "John Doe", rating: 5, comment: "Great support!" },
    { user: "Jane Smith", rating: 3, comment: "Satisfactory experience." },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(null);

  // Open Reply Modal
  const openReplyModal = (query) => {
    setCurrentQuery(query);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentQuery(null);
  };

  // Handle Reply Submission
  const handleReply = (e) => {
    e.preventDefault();
    const reply = e.target.reply.value;

    setQueries((prevQueries) =>
      prevQueries.map((q) =>
        q.id === currentQuery.id ? { ...q, status: "Resolved" } : q
      )
    );

    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Communication with Users
        </h1>
        <p className="text-sm text-gray-500">
          Manage queries and feedback efficiently
        </p>
      </header>

      {/* Query Management */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">User Queries</h2>
          <div className="flex items-center gap-4">
            <button className="flex items-center bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300">
              <FaFilter className="mr-2" />
              Filter
            </button>
            <input
              type="text"
              placeholder="Search queries"
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>

        {/* Query Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map((query) => (
            <div
              key={query.id}
              className={`p-6 bg-white shadow-lg rounded-lg border-l-4 ${
                query.status === "Resolved"
                  ? "border-green-500"
                  : "border-yellow-500"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">
                  {query.user}
                </h3>
                <span
                  className={`text-sm font-medium ${
                    query.status === "Resolved"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {query.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{query.message}</p>
              <p className="text-xs text-gray-400 mt-4">
                Received: {query.date}
              </p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => openReplyModal(query)}
                  className="flex items-center text-blue-500 hover:text-blue-700"
                >
                  <FaReply className="mr-2" />
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          User Feedback
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {feedback.map((fb, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">{fb.user}</h3>
                <p className="text-sm text-gray-600">{fb.comment}</p>
              </div>
              <p className="text-lg font-bold text-yellow-500">{fb.rating} ★</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reply Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <h2 className="text-2xl font-bold mb-4">
          Reply to {currentQuery?.user}
        </h2>
        <form onSubmit={handleReply}>
          <textarea
            name="reply"
            placeholder="Write your reply here"
            className="w-full border border-gray-300 rounded-lg p-4 mb-4"
            rows="5"
            required
          ></textarea>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send Reply
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Reviews;
