/** The five primary navigation labels, resolved on the server.
 *
 * Shared by `SmartHeader` and `SmartFooter`, which render the same set in
 * different chrome. See `[lng]/layout.tsx` for why they are passed in rather
 * than looked up with client i18n.
 */
export interface NavLabels {
  home: string;
  resume: string;
  portfolio: string;
  blog: string;
  contact: string;
}
