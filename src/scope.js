export default function scope(...variables) {
  return (fn) => fn(...variables)
}
