interface TemplateVariables {
  [key: string]: string | number;
}

interface MailTemplateData {
  file: string;
  variables: TemplateVariables;
}

interface MailContact {
  name: string;
  email: string;
}

export default interface SendMailDTO {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: MailTemplateData;
}
