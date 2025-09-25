import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Mock fetch function for reviews (in real case, call /api/reviews/hostaway)
async function fetchReviews() {
  return [
    {
      id: 1,
      guestName: "Shane Finkelstein",
      listingName: "2B N1 A - 29 Shoreditch Heights",
      type: "host-to-guest",
      rating: 9,
      categories: [
        { category: "cleanliness", rating: 10 },
        { category: "communication", rating: 10 },
      ],
      submittedAt: "2020-08-21",
      approved: false,
    },
    {
      id: 2,
      guestName: "John Doe",
      listingName: "Modern Loft Downtown",
      type: "guest-to-host",
      rating: 7,
      categories: [
        { category: "cleanliness", rating: 6 },
        { category: "communication", rating: 8 },
      ],
      submittedAt: "2021-02-14",
      approved: true,
    },
  ];
}

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews().then((data) => setReviews(data));
  }, []);

  const toggleApproval = (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r))
    );
  };

  const avgRatings = reviews.map((r) => ({
    listing: r.listingName,
    rating: r.rating,
  }));

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Reviews Dashboard</h2>
          {reviews.map((review) => (
            <div key={review.id} className="border-b py-2">
              <p className="font-semibold">{review.guestName}</p>
              <p className="text-sm text-gray-600">{review.listingName}</p>
              <p>Rating: {review.rating}/10</p>
              <p>Date: {review.submittedAt}</p>
              <Button
                variant={review.approved ? "destructive" : "default"}
                size="sm"
                onClick={() => toggleApproval(review.id)}
              >
                {review.approved ? "Unapprove" : "Approve"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Average Ratings by Property</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgRatings}>
              <XAxis dataKey="listing" hide />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="rating" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
