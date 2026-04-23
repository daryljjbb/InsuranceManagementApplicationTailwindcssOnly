export default function Avatar({ firstName, lastName, size = 64 }) {
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  return (
    <div
      className="flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold"
      style={{ width: size, height: size, fontSize: size / 2.5 }}
    >
      {initials}
    </div>
  );
}
