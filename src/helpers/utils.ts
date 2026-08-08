// const isValidDate = (dateString: any) => {
//   const regEx = /^\d{4}-\d{2}-\d{2}$/;
//   if (!dateString.match(regEx)) return false; // Invalid format
//   const d = new Date(dateString);
//   const dNum = d.getTime();
//   if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
//   return d.toISOString().slice(0, 10) === dateString;
// };


// export const getSearch = (filters: any) => {
//   const search: any = {};
//   const created: any = {
//     start: null,
//     end: null,
//   };

//   if (filters) {
//     for (const prop in filters) {
//       if (filters[prop]) {
//         if (['start_date', 'end_date'].includes(prop)) {
//           if (isValidDate(filters[prop])) {
//             created.start = filters['start_date'];
//             created.end = filters['end_date'];
//             search['created'] = JSON.stringify(created);
//           }
//         } else {
//           const field = prop;
//           let value = filters[prop];
//           // eslint-disable-next-line no-prototype-builtins
//           if (filters[prop].hasOwnProperty('value')) {
//             if (filters[prop].value !== '') {
//               value = filters[prop].value;
//               search[`${field}`] = `${value}`;
//             }
//           } else {
//             value = filters[prop];
//             search[`${field}`] = `${value}`;
//           }
//         }
//       }
//     }
//     return search;
//   }
// };

export const getSearch = (filters: any) => {
  const search: any = {};

  if (!filters) return search;

  for (const prop in filters) {
    if (filters[prop]) {

      let value = filters[prop];

      // Cas des selects
      if (
        typeof filters[prop] === "object" &&
        filters[prop].hasOwnProperty("value")
      ) {
        value = filters[prop].value;
      }

      search[prop] = value;
    }
  }

  // Transformer les filtres en paramètre filter
  if (Object.keys(search).length > 0) {
    search.filter = Object.entries(search)
      .map(([key, value]) => `${key}=${value}`)
      .join(",");
    
    // supprimer les champs originaux
    Object.keys(search).forEach((key) => {
      if (key !== "filter") {
        delete search[key];
      }
    });
  }

  return search;
};