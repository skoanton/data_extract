export function get_all_json_keys(json_object, ret_array = []) {
    for (json_key in json_object) {
        if (typeof(json_object[json_key]) === 'object' && !Array.isArray(json_object[json_key])) {
            ret_array.push(json_key);
            get_all_json_keys(json_object[json_key], ret_array);
        } else if (Array.isArray(json_object[json_key])) {
            ret_array.push(json_key);
            first_element = json_object[json_key][0];
            if (typeof(first_element) === 'object') {
                get_all_json_keys(first_element, ret_array);
            }
        } else {
            ret_array.push(json_key);
        }
    }

    return ret_array
}