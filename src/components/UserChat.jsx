export default function UserChat({ from, message }) {
  return (
    <div className="">
      <small style={{ color: "black" }}>from {from}</small>
      <p className="" style={{ color: "green", marginTop: "4px" }}>
        {message}
      </p>
    </div>
  );
}