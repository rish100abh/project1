import { useEffect, useState } from "react";
import { Navbar } from "../../../components/ui/Navbar";
import { projectApi } from "../../auth/api/projectApi";
import type { Project } from "../../../types";

export function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectApi.getProjects();
      setProjects(response.data);
    } catch (err: unknown) {
      const apiMessage = (err as any)?.response?.data?.message;
      setError(apiMessage ?? (err instanceof Error ? err.message : "Failed to load projects"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      await projectApi.createProject({ title, description });
      setTitle("");
      setDescription("");
      await loadProjects();
    } catch (err: unknown) {
      const apiMessage = (err as any)?.response?.data?.message;
      setError(apiMessage ?? (err instanceof Error ? err.message : "Failed to create project"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await projectApi.deleteProject(id);
      await loadProjects();
    } catch (err: unknown) {
      const apiMessage = (err as any)?.response?.data?.message;
      setError(apiMessage ?? (err instanceof Error ? err.message : "Failed to delete project"));
    }
  };

  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="dashboard-shell">
        <div className="dashboard-grid">
          <section className="panel">
            <h2>Create project</h2>
            <form className="project-form" onSubmit={handleCreate}>
              <input
                className="input"
                placeholder="Project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="textarea"
                placeholder="Project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="btn" type="submit" disabled={saving}>
                {saving ? "Creating..." : "Create Project"}
              </button>
            </form>
          </section>

          <section className="panel">
            <h2>Your projects</h2>

            {error ? <p className="form-error">{error}</p> : null}
            {loading ? <p>Loading projects...</p> : null}

            {!loading && projects.length === 0 ? (
              <p>No projects yet. Create your first project.</p>
            ) : null}

            <div className="project-list">
              {projects.map((project) => (
                <article className="project-card" key={project.id}>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description || "No description"}</p>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}