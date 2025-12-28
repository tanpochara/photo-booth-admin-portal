import { FrameCard } from "@/components/FrameCard";
import { useGetFrameDetailed } from "@/hooks/api/useGetFrameDetailed";
import { useNavigate } from "react-router";

export const HomePage = () => {
  const { data, isLoading, error } = useGetFrameDetailed();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-4 py-8">
      {data?.map((frame) => (
        <FrameCard key={frame.id} frame={frame} onClick={() => navigate(`/frame/${frame.id}`)} />
      ))}
    </div>
  );
};
