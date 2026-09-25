import { ProgressSpinner } from "primereact/progressspinner";

export default function Loader() {
  return (
    <div className="flex min-h-75 justify-center items-center">
      <ProgressSpinner
        style={{ width: "80px", height: "80px" }}
        strokeWidth="4"
      />
    </div>
  );
}
