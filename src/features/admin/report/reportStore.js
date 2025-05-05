// reportStore.js
import { defineStore } from 'pinia';

export const useReportStore = defineStore('report', {
    state: () => ({
        reports: [],  // 보고서 목록 저장
        currentReport: null  // 현재 선택된 보고서 저장
    }),
    actions: {
        setReport(report) {
            this.currentReport = report;  // 선택된 보고서 저장
        },
        getReportById(id) {
            return this.reports.find(report => report.reportCheckDto.reportCheckId === id);  // id로 찾기
        }
    }
});
