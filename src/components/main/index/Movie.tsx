// 型定義
type movie = {
  movieUrl: string;
};
// ベースの形
const Movie = ({ movieUrl }: movie) => {
  return (
    <>
      <video
        src={movieUrl}
        autoPlay
        loop
        style={{
          width: "100%",
          height: "100%",
          outline: "none",
          border: "none",
          background:"#fff"
        }}
      />
    </>
  );
};

export default Movie;
