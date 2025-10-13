export interface ZitadelUser {
    active: boolean;
    scope: string;
    client_id: string;
    token_type: string;
    exp: unknown;
    iat: string;
    nbf: string;
    sub: string;
    aud: string | string[];
    iss: string;
    jti: string;
    username: string;
    name: string;
    given_name: string;
    family_name: string;
    locale: string;
    updated_at: string;
    preferred_username: string;
    email: string;
    email_verified: boolean;
}
