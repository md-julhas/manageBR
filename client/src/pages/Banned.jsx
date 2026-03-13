export default function Banned() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Your account has been banned
        </h1>
        <p className="text-lg">
          Please contact the system administrator or support team for
          assistance.
        </p>
      </div>
    </div>
  )
}
