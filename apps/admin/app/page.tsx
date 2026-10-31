import { Button } from "@proudlyopensource/ui/components/button"

export default function AdminPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-2xl font-medium">Proudly Open Source Admin</h1>
      <p className="text-sm text-muted-foreground">
        The admin application is ready for development.
      </p>
      <Button>Click Me</Button>
    </main>
  )
}
