function timeFormat(time: string): string {
  const between = Date.now() / 1000 - new Date(time).getTime() / 1000;
  if (between < -1) {
    const absBetween = Math.abs(between);
    if (absBetween > 86400) {
      return Math.floor(absBetween / 86400) + ' 天后';
    } else if (absBetween > 3600) {
      return Math.floor(absBetween / 3600) + ' 小时后';
    } else if (absBetween > 60) {
      return Math.floor(absBetween / 60) + ' 分钟后';
    } else {
      return Math.floor(absBetween) + ' 秒后';
    }
  } else if (between < 60) {
    return Math.floor(between) + ' 秒前';
  } else if (between < 3600) {
    return Math.floor(between / 60) + ' 分钟前';
  } else if (between < 86400) {
    return Math.floor(between / 3600) + ' 小时前';
  } else {
    return Math.floor(between / 86400) + ' 天前';
  }
}

export default timeFormat;