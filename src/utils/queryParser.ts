// import { parse } from 'qs';
//
// export function queryParser(str: string) {
//   return parse(str, {
//     decoder(
//       str: string,
//       defaultDecoder: qs.defaultDecoder,
//       charset: string,
//       type: 'key' | 'value',
//     ) {
//       if (
//         type === 'value' &&
//         /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/.test(
//           str,
//         )
//       ) {
//         return parseFloat(str);
//       }
//
//       const keywords = {
//         true: true,
//         false: false,
//         null: null,
//         undefined: undefined,
//       };
//       if (type === 'value' && str in keywords) {
//         // @ts-ignore
//         return keywords[str];
//       }
//
//       return defaultDecoder(str, defaultDecoder, charset);
//     },
//   });
// }
