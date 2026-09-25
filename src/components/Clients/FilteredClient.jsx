export function filteredClients(clients, search) {
  const searchText = search.trim().toLowerCase();

  return clients.filter((client) => {
    const nom = client.nom.toLowerCase();
    const prenom = client.prenom.toLowerCase();

    return (
      nom.includes(searchText) ||
      prenom.includes(searchText) ||
      `${prenom} ${nom}`.includes(searchText) ||
      `${nom} ${prenom}`.includes(searchText)
    );
  });
}
