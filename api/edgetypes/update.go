package edgetypes

import portainer "github.com/portainer/portainer/api"

const (
	// PortainerAgentUpdateScheduleIDHeader represents the name of the header containing the update schedule id
	PortainerAgentUpdateScheduleIDHeader = "X-Portainer-Update-Schedule-ID"
	// PortainerAgentUpdateStatusHeader is the name of the header that will have the update status
	PortainerAgentUpdateStatusHeader = "X-Portainer-Update-Status"
	// PortainerAgentUpdateErrorHeader is the name of the header that will have the update error
	PortainerAgentUpdateErrorHeader = "X-Portainer-Update-Error"
)

const (
	UpdateScheduleTimeFormat = "2006-01-02 15:04:05"
)

type (

	// UpdateScheduleID represents an Edge schedule identifier
	UpdateScheduleID int

	// UpdateSchedule represents a schedule for update/rollback of edge devices
	UpdateSchedule struct {
		// EdgeUpdateSchedule Identifier
		ID UpdateScheduleID `json:"id" example:"1"`
		// Name of the schedule
		Name string `json:"name" example:"Update Schedule"`
		// Time of the schedule
		Time UpdateScheduleTime `json:"time" example:"2022-09-12 13:12:50"`
		// EdgeGroups to be updated
		GroupIDs []portainer.EdgeGroupID `json:"groupIds" example:"1"`
		// Type of the update (1 - update, 2 - rollback)
		Type UpdateScheduleType `json:"type" example:"1" enums:"1,2"`
		// Status of the schedule, grouped by environment id
		Status map[portainer.EndpointID]UpdateScheduleStatus `json:"status"`
		// Created timestamp
		Created int64 `json:"created" example:"1564897200"`
		// Created by user id
		CreatedBy portainer.UserID `json:"createdBy" example:"1"`
	}

	UpdateScheduleTime string

	// UpdateScheduleType represents type of an Edge update schedule
	UpdateScheduleType int

	// UpdateScheduleStatus represents status of an Edge update schedule
	UpdateScheduleStatus struct {
		// Status of the schedule (0 - pending, 1 - failed, 2 - success)
		Status UpdateScheduleStatusType `json:"status" example:"1" enums:"1,2,3"`
		// Error message if status is failed
		Error string `json:"error" example:""`
		// Target version of the edge agent
		TargetVersion string `json:"targetVersion" example:"1"`
		// Current version of the edge agent
		CurrentVersion string `json:"currentVersion" example:"1"`
	}

	// UpdateScheduleStatusType represents status type of an Edge update schedule
	UpdateScheduleStatusType int

	VersionUpdateRequest struct {
		// Target version
		Version string
		// Scheduled time
		ScheduledTime UpdateScheduleTime
		// If need to update
		Active bool
		// Update schedule ID
		ScheduleID UpdateScheduleID
	}

	// VersionUpdateStatus represents the status of an agent version update
	VersionUpdateStatus struct {
		Status     UpdateScheduleStatusType
		ScheduleID UpdateScheduleID
		Error      string
	}

	// EndpointUpdateScheduleRelation represents the relation between an environment(endpoint) and an update schedule
	EndpointUpdateScheduleRelation struct {
		EnvironmentID portainer.EndpointID     `json:"environmentId"`
		ScheduleID    UpdateScheduleID         `json:"scheduleId"`
		TargetVersion string                   `json:"targetVersion"`
		Status        UpdateScheduleStatusType `json:"status"`
		Error         string                   `json:"error"`
		Type          UpdateScheduleType       `json:"type"`
		ScheduledTime UpdateScheduleTime       `json:"scheduledTime"`
	}
)

const (
	_ UpdateScheduleType = iota
	// UpdateScheduleUpdate represents an edge device scheduled for an update
	UpdateScheduleUpdate
	// UpdateScheduleRollback represents an edge device scheduled for a rollback
	UpdateScheduleRollback
)

const (
	// UpdateScheduleStatusPending represents a pending edge update schedule
	UpdateScheduleStatusPending UpdateScheduleStatusType = iota
	// UpdateScheduleStatusSent represents a sent edge update schedule
	UpdateScheduleStatusSent
	// UpdateScheduleStatusSuccess represents a successful edge update schedule
	UpdateScheduleStatusSuccess
	// UpdateScheduleStatusError represents a failed edge update schedule
	UpdateScheduleStatusError
	// UpdateScheduleStatusSkip represents a skipped edge update schedule
	UpdateScheduleStatusSkip
)

// AggregatedStatus aggregates the status of all environments in a schedule
func AggregatedStatus(statuses map[portainer.EndpointID]UpdateScheduleStatus) UpdateScheduleStatusType {
	if len(statuses) == 0 {
		return UpdateScheduleStatusPending
	}

	for _, status := range statuses {
		if status.Status != UpdateScheduleStatusSuccess {
			return status.Status
		}
	}

	return UpdateScheduleStatusSuccess
}
