const goToReportDetail = (report) => {
    store.setReport(report);  // Pinia store에 저장
    router.push(`/report/check/${report.reportCheckDto.reportCheckId}`);  // 경로만 전달
};
