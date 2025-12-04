interface TagProps {
  children: string;
  color?: string;
}

export function Tag({ children, color = '#14b8a6' }: TagProps) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs"
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {children}
    </span>
  );
}
