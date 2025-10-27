import React from "react";
import { RolDTO } from "../../types/Rol";

interface ListarRolesProps {
  value: string;
  onChange: (rolId: string) => void;
  roles: RolDTO[];
}

const ListarRoles: React.FC<ListarRolesProps> = ({ value, onChange, roles }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Selecciona un rol</option>
      {roles.map((rol) => (
        <option key={rol.id} value={rol.id}>
          {rol.nombre}
        </option>
      ))}
    </select>
  );
};

export default ListarRoles;
