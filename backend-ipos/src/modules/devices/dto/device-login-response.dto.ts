export class DeviceLoginResponseDto {

    user_id: String;
    role: { roleName: String }[];
    userName: String;
    outlets: { uuid: String, storeName: String }[];

}