import React from "react";

const Filters = ({ companyNameFilter, setCompanyNameFilter, statusFilter, setStatusFilter }) => {
  return (
    <div className="filters">
      <select onChange={(e) => setCompanyNameFilter(e.target.value)} value={companyNameFilter}>
        <option value="">Toutes les relances</option>
        <option value="true">Relancés uniquement</option>
        <option value="false">Non relancés</option>
      </select>
      <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
        <option value="">Tous les statuts</option>
        <option value="imported,invited">Importé & invité</option>
        <option value="registered">Inscrit</option>
      </select>
    </div>
  );
};

export default Filters;

