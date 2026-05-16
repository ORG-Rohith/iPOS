export class DeviceLoginResponseDto {

    user_uuid: String;
    role: { role_name: String }[];
    user_full_name: String;
    outlets: { uuid: String, store_name: String }[];

}

export class DeviceRegistrationPayloadDto {
    device_uuid: String;
    activation_code: String;
}