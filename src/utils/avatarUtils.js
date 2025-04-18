export function stringToColor() {
    return '#B0BEC5'; // Fixed gray color
  }
export function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }