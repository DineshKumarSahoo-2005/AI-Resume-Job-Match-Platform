import { useEffect, useState } from "react";
import CandidateLayout from "../layouts/CandidateLayout";
import { getMyOffers, updateOfferStatus } from "../services/offerService";

function MyOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const data = await getMyOffers();

      setOffers(data.offers);
    } catch (error) {
      return;
    }
  };

  const handleOfferStatus = async (offerId, status) => {
    try {
      await updateOfferStatus(offerId, status);

      fetchOffers();

      alert(`Offer ${status} ✅`);
    } catch (error) {
      return;
    }
  };

  return (
    <CandidateLayout>
      <h1 className="text-5xl font-bold mb-8">🎉 My Offers</h1>

      {offers.length === 0 ? (
        <div
          className="
        bg-white/5
        rounded-3xl
        p-10
        text-center
        "
        >
          <h2 className="text-2xl font-bold">No Offers Yet</h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="
              bg-neutral-100
  dark:bg-white/5
  border
  border-white/10
  rounded-3xl
  p-6
  backdrop-blur-xl
  hover:border-purple-500/40
  hover:-translate-y-1
  transition-all
  duration-300
  flex
  flex-col
  justify-between
  min-h-[320px]
  "
            >
              <div>
                <h2 className="text-2xl font-bold dark:text-white">
                  {offer.job?.title}
                </h2>

                <p className="text-slate-400 mt-1">🏢 {offer.job?.company}</p>

                <div className="mt-5 space-y-3">
                  <p className="dark:text-white">
                    💰 Package:
                    <span className="font-bold text-green-400 ml-2">
                      {offer.package}
                    </span>
                  </p>

                  <p className="dark:text-white">
                    📅 Joining:
                    <span className="font-bold text-cyan-400 ml-2">
                      {new Date(offer.joiningDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>

              <a
                href={`http://localhost:5000/${offer.pdfPath}`}
                target="_blank"
                rel="noreferrer"
                className="
                inline-block
                mt-5
                bg-purple-600
                hover:bg-purple-700
                dark:text-white
                px-5
                py-2
                rounded-xl
                "
              >
                📄 Download Offer Letter
              </a>

              <div className="mt-4">
                <span
                  className={`
px-3 py-1 rounded-full

${offer.offerStatus === "Accepted" ? "bg-green-500/20 text-green-500" : ""}

${offer.offerStatus === "Declined" ? "bg-red-500/20 text-red-500" : ""}

${offer.offerStatus === "Pending" ? "bg-yellow-500/20 text-yellow-500" : ""}
`}
                >
                  {offer.offerStatus}
                </span>
              </div>

              {offer.offerStatus === "Pending" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleOfferStatus(offer._id, "Accepted")}
                    className="
bg-green-600
dark:text-white
px-4
py-2
rounded-xl
"
                  >
                    Accept Offer
                  </button>

                  <button
                    onClick={() => handleOfferStatus(offer._id, "Declined")}
                    className="
bg-red-600
dark:text-white
px-4
py-2
rounded-xl
"
                  >
                    Decline Offer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </CandidateLayout>
  );
}

export default MyOffers;
