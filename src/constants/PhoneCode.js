export function getCode(e) {
  let providerName = null;
  const code = e.target.value;
  if (code.startsWith("+")) {
    if (["+23320", "+23350"].includes(code.slice(0, 6))) {
      providerName = "vodafone";
    }
    if (
      ["+23324", "+23354", "+23355", "+23359", "+23325"].includes(
        code.slice(0, 6)
      )
    ) {
      providerName = "mtn";
    }

    if (["+23327", "+23357", "+23326", "+23356"].includes(code.slice(0, 6))) {
      providerName = "airteltigo";
    }
  } else {
    if (["020", "050"].includes(code.slice(0, 3))) {
      providerName = "vodafone";
    }
    if (["024", "054", "055", "059", "025"].includes(code.slice(0, 3))) {
      providerName = "mtn";
    }

    if (["027", "057", "026", "056"].includes(code.slice(0, 3))) {
      providerName = "airteltigo";
    }
  }

  return { code, providerName };
}
