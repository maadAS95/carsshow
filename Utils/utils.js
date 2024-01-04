const cancelingBookingPeriodCondition = (bookedAt) => {
  const cancelingDiffernce = 24 * 60 * 60 * 1000;
  const currentTime = new Date().getTime();
  const differenceTime = Math.abs(bookedAt.getTime() - currentTime);
  return differenceTime > cancelingDiffernce;
};

module.exports = { cancelingBookingPeriodCondition };
