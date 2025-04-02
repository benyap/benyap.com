const SLATE_700_HEX = "#314158";
const SKY_600_HEX = "#0084d1";

export function OGImage() {
  return (
    <div
      style={{
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "36px",
        }}
      >
        <svg
          id="Content"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          style={{
            width: "160px",
            height: "160px",
          }}
        >
          <path
            d="M34.82,173.71V850.29s185.05-.2,227,0,225.31-10.94,225.31-179.7c0-154.78-174.77-170.48-174.77-170.48s137.93-24.28,137.93-159.63c0-148.21-150.49-166.77-183.9-166.77Z"
            style={{ fill: SLATE_700_HEX }}
          />
          <polygon
            points="494.55 174.13 989.18 174.71 742.88 555.36 742.66 555.36 742.45 554.79 742.88 555.36 494.55 174.13"
            style={{ fill: SLATE_700_HEX }}
          />
          <rect width="1024" height="1024" style={{ fill: "none" }} />
        </svg>
        <p
          style={{
            fontSize: 150,
            color: SKY_600_HEX,
          }}
        >
          Photos
        </p>
      </div>
    </div>
  );
}
