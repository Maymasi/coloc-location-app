export function stringToColor(color='#B0BEC5') {
    return color; // Fixed gray color
  }
export function stringAvatar(name,color='#B0BEC5') {
    return {
      sx: {
        bgcolor: stringToColor(color),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }