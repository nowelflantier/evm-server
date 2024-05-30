import React, { useEffect } from "react";

const Filters = ({ companyNameFilter, setCompanyNameFilter, statusFilter, setStatusFilter }) => {
  useEffect(() => {
    // Load filters from localStorage on mount
    const savedCompanyNameFilter = localStorage.getItem("companyNameFilter");
    const savedStatusFilter = localStorage.getItem("statusFilter");
    if (savedCompanyNameFilter) setCompanyNameFilter(savedCompanyNameFilter);
    if (savedStatusFilter) setStatusFilter(savedStatusFilter);
  }, [setCompanyNameFilter, setStatusFilter]);

  const handleCompanyNameFilterChange = (e) => {
    const value = e.target.value;
    setCompanyNameFilter(value);
    localStorage.setItem("companyNameFilter", value);
  };

  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    localStorage.setItem("statusFilter", value);
  };

  const handleClearFilters = () => {
    setCompanyNameFilter("");
    setStatusFilter("");
    localStorage.removeItem("companyNameFilter");
    localStorage.removeItem("statusFilter");
  };

  return (
    <div className="filters">
      <select onChange={handleCompanyNameFilterChange} value={companyNameFilter}>
        <option value="">Toutes les relances</option>
        <option value="true">Relancés uniquement</option>
        <option value="false">Non relancés</option>
      </select>
      <select onChange={handleStatusFilterChange} value={statusFilter}>
        <option value="">Tous les statuts</option>
        <option value="imported,invited">Importé & invité</option>
        <option value="registered">Inscrit</option>
      </select>
      <button onClick={handleClearFilters}>Supprimer les filtres</button>
    </div>
  );
};

export default Filters;
