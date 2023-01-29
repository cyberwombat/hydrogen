// vite.config.ts
import hydrogen from "@shopify/hydrogen/plugin";
import { defineConfig } from "vite";
var vite_config_default = defineConfig({
  plugins: [hydrogen()],
  resolve: {
    alias: [{ find: /^~\/(.*)/, replacement: "/src/$1" }]
  },
  optimizeDeps: {
    include: ["@headlessui/react", "clsx", "react-use", "typographic-base"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cbmltcG9ydCBoeWRyb2dlbiBmcm9tICdAc2hvcGlmeS9oeWRyb2dlbi9wbHVnaW4nXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbaHlkcm9nZW4oKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW3sgZmluZDogL15+XFwvKC4qKS8sIHJlcGxhY2VtZW50OiAnL3NyYy8kMScgfV1cbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogWydAaGVhZGxlc3N1aS9yZWFjdCcsICdjbHN4JywgJ3JlYWN0LXVzZScsICd0eXBvZ3JhcGhpYy1iYXNlJ11cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLGNBQWM7QUFDckIsU0FBUyxvQkFBb0I7QUFFN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUFBLEVBQ3BCLFNBQVM7QUFBQSxJQUNQLE9BQU8sQ0FBQyxFQUFFLE1BQU0sWUFBWSxhQUFhLFVBQVUsQ0FBQztBQUFBLEVBQ3REO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMscUJBQXFCLFFBQVEsYUFBYSxrQkFBa0I7QUFBQSxFQUN4RTtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
