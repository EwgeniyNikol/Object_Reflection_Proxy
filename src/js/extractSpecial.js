export default function extractSpecial({ special } = {}) {
  if (!special || !Array.isArray(special)) {
    return [];
  }

  return special.map(({
    id,
    name,
    description = 'Описание недоступно',
    icon,
  }) => ({
    id,
    name,
    description,
    icon,
  }));
}
