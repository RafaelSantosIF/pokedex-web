type Props = {
  size?: number;
  className?: string;
};

export default function Pokeball({ size = 24, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <path d="M4 50a46 46 0 0 1 92 0z" fill="#ff5350" />
      <path d="M4 50a46 46 0 0 0 92 0z" fill="#ffffff" />
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="#0b1a3a"
        strokeWidth="7"
      />
      <path d="M4 50h92" stroke="#0b1a3a" strokeWidth="7" />
      <circle
        cx="50"
        cy="50"
        r="14"
        fill="#ffffff"
        stroke="#0b1a3a"
        strokeWidth="7"
      />
    </svg>
  );
}
