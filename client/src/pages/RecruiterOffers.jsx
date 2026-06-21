import { useEffect, useState } from "react";
import RecruiterLayout from "../layouts/RecruiterLayout";
import { getRecruiterOffers } from "../services/offerService";

function RecruiterOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const data = await getRecruiterOffers();

      setOffers(data.offers);
    } catch (error) {
      return;
    }
  };

  const accepted = offers.filter((o) => o.offerStatus === "Accepted").length;

  const declined = offers.filter((o) => o.offerStatus === "Declined").length;

  const pending = offers.filter((o) => o.offerStatus === "Pending").length;

  return (
    <RecruiterLayout>
      <h1 className="text-5xl font-bold mb-8">🎉 Offers</h1>

      {/* Stats */}

      <div
        className="
      grid
      md:grid-cols-4
      gap-6
      mb-8
      "
      >
        <div
          className="
        bg-cyan-100
        dark:bg-white/5
        p-6
        rounded-3xl
        "
        >
          <h3>Total</h3>

          <p
            className="
          text-4xl
          font-bold
          "
          >
            {offers.length}
          </p>
        </div>

        <div
          className="
        bg-green-500/10
        p-6
        rounded-3xl
        "
        >
          <h3>Accepted</h3>

          <p
            className="
          text-4xl
          font-bold
          text-green-500
          "
          >
            {accepted}
          </p>
        </div>

        <div
          className="
        bg-red-500/10
        p-6
        rounded-3xl
        "
        >
          <h3>Declined</h3>

          <p
            className="
          text-4xl
          font-bold
          text-red-500
          "
          >
            {declined}
          </p>
        </div>

        <div
          className="
        bg-yellow-500/10
        p-6
        rounded-3xl
        "
        >
          <h3>Pending</h3>

          <p
            className="
          text-4xl
          font-bold
          text-yellow-500
          "
          >
            {pending}
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {offers.map((offer) => (
          <div
            key={offer._id}
            className="
            bg-neutral-100
            dark:bg-white/5
            rounded-3xl
            p-6
            border
            border-white/10
            "
          >
            <h2
              className="
            text-2xl
            font-bold
            "
            >
              {offer.candidate?.name}
            </h2>

            <p>{offer.candidate?.email}</p>

            <div className="mt-4">
              <p>💼 {offer.job?.title}</p>

              <p>🏢 {offer.job?.company}</p>

              <p>💰 {offer.package}</p>

              <p>📅 {new Date(offer.joiningDate).toLocaleDateString()}</p>
            </div>

            <div className="mt-4">
              <span
                className={`
                px-4
                py-2
                rounded-full

                ${
                  offer.offerStatus === "Accepted"
                    ? "bg-green-500/20 text-green-500"
                    : ""
                }

                ${
                  offer.offerStatus === "Declined"
                    ? "bg-red-500/20 text-red-500"
                    : ""
                }

                ${
                  offer.offerStatus === "Pending"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : ""
                }
                `}
              >
                {offer.offerStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </RecruiterLayout>
  );
}

export default RecruiterOffers;
