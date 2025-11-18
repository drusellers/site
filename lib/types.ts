export interface Employer {
  employer: string
  url: string
  urllabel: string
  roles: Role[]
}

export interface Role {
  title: string
  start: string
  end: string
  description: string[]
}

export interface Education {
  school: string
  url: string
  urllabel: string
  start: string
  end: string
  major: string
  minor: string
}

export interface Resume {
  title: string
  startYear: string
  layout: string
  summary: string
  employers: Employer[]
  archived_employers: Employer[]
  education: Education[]
  activities: string[]
}
