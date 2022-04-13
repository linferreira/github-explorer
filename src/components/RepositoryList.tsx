import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";

interface IRepository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [list, setList] = useState<IRepository[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/linferreira/repos")
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        {list.map((repository) => (
          <RepositoryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  );
}
